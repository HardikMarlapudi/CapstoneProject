type StatsCardProps = {
    title: string,
    value: string | number,
    description: string;
};

export default function statsCard({
    title,
    value,
    description,
}: StatsCardProps) {
 return (
    <div className="rounded-xl border border-zinc-900 bg-zinc-100 p-6">
        <p className="text-sm text-zinc-500">{title}</p>
        <p className="mt-3 text-zinc-500">{value}</p>
        <p className="mt-3 text-zinc-500">{description}</p>
    </div>
 );
}
