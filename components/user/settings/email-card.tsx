"use client";
import { FormEventHandler, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Mail, CheckCircle, XCircle, AlertCircle, Clock, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { emailOtp } from "@/lib/auth-client";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

interface EmailVerificationCardProps {
    data: {
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
    };
    className?: string
}

type VerificationState = 'idle' | 'sending' | 'sent' | 'verifying' | 'success' | 'error';

export function EmailCard({
    data,
    className
}: EmailVerificationCardProps) {
    const t = useTranslations();
    const [email, setEmail] = useState(data.email);
    const [state, setState] = useState<VerificationState>('idle');
    const [isVerified, setIsVerified] = useState(data.emailVerified);
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const startCountdown = (seconds: number) => {
        setCountdown(seconds);
        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleSendOtp: FormEventHandler = async (e) => {
        e.preventDefault();
        setState('sending');

        try {
            const { data: response, error } = await emailOtp.sendVerificationOtp({
                email: email,
                type: "email-verification"
            });

            if (error) {
                throw new Error(error.message || 'Failed to send verification code');
            }

            toast.success(t('forms.settings.account.email.otp_sent_success'));
            setState('sent');
            setShowOtpInput(true);
            startCountdown(300); // 5 minutes countdown
        } catch (error) {
            toast.error(t('forms.settings.account.email.otp_sent_error'));
            setState('error');
            setTimeout(() => setState('idle'), 3000);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp.trim()) {
            toast.error(t('forms.settings.account.email.enter_otp'));
            return;
        }

        setState('verifying');

        try {
            // This would be your actual OTP verification API call
            // For now, we'll simulate it
            const { data: response, error } = await emailOtp.verifyEmail({
                email: email,
                otp: otp,
            });

            if (error) {
                throw new Error(error.message || 'Invalid verification code');
            }

            toast.success(t('forms.settings.account.email.verification_success'));
            setState('success');
            setIsVerified(true);
            setTimeout(() => {
                setShowOtpInput(false);
                setOtp('');
                setState('idle');
            }, 2000);
        } catch (error) {
            toast.error(t('forms.settings.account.email.otp_invalid'));
            setState('error');
        }
    };

    const handleResendOtp = async () => {
        if (countdown > 0) {
            toast.info(t('forms.settings.account.email.wait_to_resend', { seconds: formatTime(countdown) }));
            return;
        }
        handleSendOtp({ preventDefault: () => { } } as any);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };


    const StatusBadge = () => {
        if (isVerified) {
            return (
                <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100 gap-1">
                    <CheckCircle className="h-3 w-3" />
                    {t('common.verified')}
                </Badge>
            );
        }

        if (showOtpInput) {
            return (
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 gap-1">
                    <Clock className="h-3 w-3" />
                    {t('common.pending_verification')}
                </Badge>
            );
        }

        return (
            <Badge variant="destructive" className="bg-red-50 text-red-700 gap-1">
                <XCircle className="h-3 w-3" />
                {t('common.unverified')}
            </Badge>
        );
    };

    return (
        <Card className={cn("w-full bg-sidebar-accent", className)}>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-lg font-semibold">
                            {t('forms.settings.account.email.name')}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            {isVerified
                                ? t('forms.settings.account.email.verified_description')
                                : t('forms.settings.account.email.unverified_description')
                            }
                        </p>
                    </div>
                </div>
                <StatusBadge />
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Email Display */}
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                        {t('forms.settings.account.email.current_email')}
                    </Label>
                    <div className="relative">
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isVerified || state === 'sending'}
                            className={cn(
                                "pl-10",
                                isVerified && "bg-green-50 border-green-200"
                            )}
                        />
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                </div>

                {/* OTP Input Section */}
                {showOtpInput && !isVerified && (
                    <div className="space-y-4 animate-in fade-in-50">
                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription className="text-sm">
                                {t('forms.settings.account.email.otp_sent_message')}
                            </AlertDescription>
                        </Alert>

                        <div className="space-y-3">
                            <Label htmlFor="otp" className="text-sm font-medium">
                                {t("forms.settings.account.email.enter_otp")}
                            </Label>

                            {/* OTP Input */}
                            <div className="space-y-1">
                                <InputOTP
                                    id="otp"
                                    maxLength={6}
                                    value={otp}
                                    onChange={setOtp}
                                    disabled={state === "verifying" || state === "success"}
                                >
                                    <InputOTPGroup>
                                        {Array.from({ length: 6 }).map((_, i) => (
                                            <InputOTPSlot
                                                key={i}
                                                index={i}
                                            />
                                        ))}
                                    </InputOTPGroup>
                                </InputOTP>

                                <p className="text-xs text-muted-foreground">
                                    {t("forms.settings.account.email.otp_hint")}
                                </p>
                            </div>

                            {/* Verify Button */}
                            <Button
                                type="button"
                                onClick={handleVerifyOtp}
                                disabled={state === "verifying" || state === "success" || otp.length !== 6}
                                className="w-full sm:w-auto sm:min-w-[120px]"
                            >
                                {state === "verifying" ? (
                                    <>
                                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                                        Verifying
                                    </>
                                ) : (
                                    "Verify OTP"
                                )}
                            </Button>
                        </div>



                        {/* Resend OTP */}
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                                {t('forms.settings.account.email.didnt_receive_code')}
                            </span>
                            <Button
                                type="button"
                                variant="link"
                                onClick={handleResendOtp}
                                disabled={countdown > 0 || state === 'sending'}
                                className="h-auto p-0"
                            >
                                {countdown > 0 ? (
                                    <span className="text-amber-600">
                                        Resend in {formatTime(countdown)}
                                    </span>
                                ) : state === 'sending' ? (
                                    <>
                                        <Loader className="mr-1 h-3 w-3 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    t('forms.settings.account.email.resend_code')
                                )}
                            </Button>
                        </div>
                    </div>
                )}

                {/* Last Updated Info */}
                {isVerified && (
                    <div className="pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-3 w-3" />
                            <span>
                                {t('forms.settings.account.email.last_verified')}:{" "}
                                {new Date(data.updatedAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                )}
            </CardContent>

            {/* Action Buttons */}
            {!isVerified && (
                <CardFooter className="border-t pt-6">
                    {!showOtpInput ? (
                        <Button
                            type="button"
                            onClick={handleSendOtp}
                            disabled={state === 'sending'}
                            className="w-full"
                            size="lg"
                        >
                            {state === 'sending' ? (
                                <>
                                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                                    {t('forms.settings.account.email.sending_code')}
                                </>
                            ) : (
                                <>
                                    <Send className="mr-2 h-4 w-4" />
                                    {t('forms.settings.account.email.send_verification_code')}
                                </>
                            )}
                        </Button>
                    ) : (
                        <div className="w-full space-y-3">
                            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                <AlertCircle className="h-4 w-4" />
                                <span>
                                    {t('forms.settings.account.email.code_expires_in')}: {formatTime(countdown)}
                                </span>
                            </div>
                        </div>
                    )}
                </CardFooter>
            )}
        </Card>
    );
}