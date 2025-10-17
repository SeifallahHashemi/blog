import { TableValueProps } from '@/types';
import { TablePreview } from '@sanity/table';
import { PreviewProps } from 'sanity';

export function TableWidget(props: TableValueProps & PreviewProps) {
  const { table, caption, title, ...rest } = props;
  const tablePreviewProps = { ...rest, rows: table?.rows || [] };

  console.log(title);
  return (
    <>
      <div className="px-3">
        <em className="not-italic text-sm font-semibold">
          {caption ?? 'عنوانی تعریف نشده است'}
        </em>
      </div>
      <TablePreview {...tablePreviewProps} description={caption} />
    </>
  );
}
