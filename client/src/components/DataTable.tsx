import { RecordT } from "@/types/Record";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";

export function DataTable({
  records,
  handleRevertToRecord,
}: {
  records: RecordT[];
  handleRevertToRecord: (targetRecordId: string) => Promise<void>;
}) {
  return (
    <div className="w-full rounded-lg overflow-hidden shadow-sm border-border border">
      <Table>
        <TableHeader className="bg-muted rounded-xl">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Hash</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {records.length > 0 ? (
            records
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="text-xs">{record.id}</TableCell>
                  <TableCell className="text-base text-primary">
                    {JSON.stringify(record.data.content)}
                  </TableCell>
                  <TableCell className="text-xs">
                    {new Date(record.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-xs">
                    <div className="flex flex-row gap-2">
                      <div className="text-primary font-bold text-xs">
                        Previous:
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {record.previousHash}
                      </div>
                    </div>
                    <div className="flex flex-row gap-2">
                      <div className="text-primary font-bold text-xs">
                        Current:
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {record.hash}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleRevertToRecord(record.id)}
                      disabled={record.id !== records[0].id}
                    >
                      Revert
                    </Button>
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={99} className="text-center">
                No records found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
