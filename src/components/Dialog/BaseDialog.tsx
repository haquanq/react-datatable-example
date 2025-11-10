import { Dialog } from "@base-ui-components/react";

interface BaseDialogProps {
  trigger?: React.JSX.Element;
  title?: string;
  description?: string;
  children?: React.JSX.Element;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const BaseDialog = ({ trigger, title, description, children, open, onOpenChange }: BaseDialogProps) => {
  return (
    <Dialog.Root modal="trap-focus" open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger render={trigger} />}
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 min-h-screen bg-gray-900 opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 w-fit min-w-100 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 text-gray-900 outline outline-gray-200 transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0">
          <div className="flex max-w-100 flex-col gap-4">
            {title && <Dialog.Title className="text-xl font-medium">{title}</Dialog.Title>}
            {description && <Dialog.Description className="mb-4 text-sm">{description}</Dialog.Description>}
          </div>
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
