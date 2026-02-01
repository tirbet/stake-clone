
type Props = {
    params: Promise<{ category: string }>;
};


export default async function PromotionCategoryPage({ params }: Readonly<Props>) {
    const { category } = await params;
    return (
        <>Promotion category {category}</>
    );
}
