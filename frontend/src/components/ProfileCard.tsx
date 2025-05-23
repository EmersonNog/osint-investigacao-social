export default function ProfileCard({ data }: { data: any }) {
  return (
    <div className="border rounded p-6 shadow-md w-full max-w-xl bg-gray-50">
      <h3 className="text-lg font-semibold">{data.name}</h3>
      <p>
        <strong>Localização:</strong> {data.location}
      </p>
      <p>
        <strong>Última atividade:</strong> {data.lastSeen}
      </p>
      <p>
        <strong>Análise:</strong> {data.activity}
      </p>
      <p>
        <strong>Nível de risco:</strong>{" "}
        <span className="font-bold text-red-500">{data.riskLevel}</span>
      </p>
    </div>
  );
}
