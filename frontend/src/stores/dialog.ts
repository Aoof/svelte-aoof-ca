import { writable } from "svelte/store";

interface Dialog {
  open: boolean;
  title: string;
  content: string;
  buttons: { text: string; action: () => void; class: string }[];
}

export const dialog = writable<Dialog>({
  open: false,
  title: "",
  content: "",
  buttons: []
});

export const openDialog = (_dialog : Dialog) => {
    dialog.set(_dialog);
}

export const closeDialog = () => {
    dialog.set({ open: false, title: "", content: "", buttons: [] });
}

export const confirmDialog = (_title : string, _content : string, _action : () => void) => {
    dialog.set({
        open: true,
        title: _title,
        content: _content,
        buttons: [
            { text: "Cancel", action: closeDialog, class: "b-full-info" },
            { text: "Confirm", action: _action, class: "b-full-red" },
        ],
    });
}