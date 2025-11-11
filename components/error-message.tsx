"use client";

type ErrorMessageProps = {
    title?: string;
    message: string;
};

export const ErrorMessage = ({ title = "Error", message }: ErrorMessageProps) => {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center text-red-500">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-base text-muted-foreground">{message}</p>
        </div>
    );
}
