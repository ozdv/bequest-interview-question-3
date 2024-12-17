export function DataStatus({ isChainValid }: { isChainValid: boolean }) {
  return (
    <div className="flex gap-2 flex-col border rounded-xl p-4 shadow-sm border-border w-full">
      <h3 className="text-lg font-bold mb-3">Data Chain Status:</h3>
      <div className="text-sm text-muted-foreground">
        {isChainValid ? "✅ Valid" : "❌ Tampered"}
      </div>
    </div>
  );
}
