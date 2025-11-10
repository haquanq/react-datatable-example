import { Popover } from "@base-ui-components/react";

interface BaseDialogProps {
  trigger?: React.JSX.Element;
  title?: string;
  description?: string;
  children?: React.JSX.Element;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const BasePopover = ({ trigger, title, description, children, open, onOpenChange }: BaseDialogProps) => {
  return (
    <Popover.Root modal="trap-focus" open={open} onOpenChange={onOpenChange}>
      <Popover.Trigger render={trigger} />
      <Popover.Portal>
        <Popover.Positioner sideOffset={8} align="end">
          <Popover.Popup className="origin-(--transform-origin) rounded-lg bg-white text-gray-900 shadow-2xl outline outline-gray-200 transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0">
            <Popover.Title className="sr-only">{title}</Popover.Title>
            <Popover.Description className="sr-only">{description}</Popover.Description>
            {children}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
};
