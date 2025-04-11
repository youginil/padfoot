import { Accessor, ParentComponent, Setter, Show } from "solid-js";
import { Portal } from "solid-js/web";

const Modal: ParentComponent<{
    control: [Accessor<boolean>, Setter<boolean>];
    closable?: boolean;
    title?: string;
}> = (props) => {
    function close() {
        props.control[1](false);
    }

    return (
        <Portal mount={document.body}>
            <dialog open={props.control[0]()} class="modal">
                <div class="modal-box">
                    <Show when={props.closable ?? true}>
                        <button
                            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={close}
                        >
                            ✕
                        </button>
                    </Show>
                    <Show when={props.title}>
                        <h3 class="text-lg font-bold">{props.title}</h3>
                    </Show>
                    {props.children}
                </div>
            </dialog>
        </Portal>
    );
};

export default Modal;
