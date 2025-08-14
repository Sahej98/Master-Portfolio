import React from 'react';
import { LucideProps } from 'lucide-react';

interface FormFieldProps {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  IconComponent: React.ComponentType<LucideProps>;
  as?: 'input' | 'textarea';
  type?: string;
  required?: boolean;
}

const FormField = ({
  id,
  name,
  placeholder,
  value,
  onChange,
  IconComponent,
  as = 'input',
  type = 'text',
  required = true,
}: FormFieldProps) => {
  const isTextarea = as === 'textarea';
  const commonClasses =
    'w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-slate-900/50 rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition text-gray-800 dark:text-white placeholder-slate-400';

  const iconClasses = `absolute left-3 w-5 h-5 text-slate-400 ${
    isTextarea ? 'top-5 -translate-y-1' : 'top-1/2 -translate-y-1/2'
  }`;

  return (
    <div className='relative'>
      <IconComponent className={iconClasses} />
      {isTextarea ? (
        <textarea
          id={id}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className={`${commonClasses} resize-none`}
          placeholder={placeholder}
          rows={4}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className={commonClasses}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default FormField;
