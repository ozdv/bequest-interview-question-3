import { RecordT } from "@/types/Record";

export function DataStatus({
  isChainValid,
  currentData,
}: {
  isChainValid: boolean;
  currentData: RecordT | null;
}) {
  return (
    <div className="flex gap-2 flex-col border rounded-xl p-4 shadow-sm border-border w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 items-center flex-1">
        <h3 className="text-lg font-bold">Data Chain Status:</h3>
        <div className="text-sm text-muted-foreground">
          {isChainValid ? "✅ Valid" : "❌ Tampered"}
        </div>
      </div>
      <div className="min-w-full border-b border-border -mx-4" />
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 flex-1 items-center">
        <h3 className="text-lg font-bold">Current Record:</h3>
        {currentData && (
          <div className="text-base text-primary italic">
            {JSON.stringify(currentData.data.content)}
          </div>
        )}
      </div>
    </div>
  );
}
