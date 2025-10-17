import { AnyFieldApi } from '@tanstack/react-form';

interface FieldInfoProps {
  field: AnyFieldApi;
}

export function FieldInfo({ field }: FieldInfoProps) {
  return (
    <div className="flex flex-row gap-2 flex-wrap my-1">
      {field.state.meta.isTouched && !field.state.meta.isValid
        ? field.state.meta.errors.map((err, ind) => (
            <em
              key={ind}
              className="text-xs leading-relaxed tracking-tight text-red-400 font-normal"
            >
              {ind + 1}- {err.message}
            </em>
          ))
        : null}
      {field.state.meta.isValidating ? 'درحال اعتبارسنجی ...' : null}
    </div>
  );
}