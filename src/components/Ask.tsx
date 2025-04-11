import { batch, Component, createSignal, Show } from "solid-js";
import Modal from "./Modal";

const Ask: Component<{
    title?: string;
    content: string;
    action: <T>() => Promise<T>;
    yes?: string;
    no?: string;
    danger?: boolean;
}> = (props) => {
    const [visible, setVisible] = createSignal(false);
    const [loading, setLoading] = createSignal(false);

    async function execute() {
        setLoading(true);
        try {
            await props.action();
        } catch (e) {
            //
        }
        batch(() => {
            setVisible(false);
            setLoading(false);
        });
    }

    return (
        <Modal control={[visible, setVisible]} title={props.title}>
            <p>{props.content}</p>
            <div class="text-right">
                <button
                    class="btn btn-soft"
                    classList={{
                        "btn-primary": !props.danger,
                        "btn-error": props.danger,
                    }}
                    onClick={execute}
                    disabled={loading()}
                >
                    <Show when={loading()}>
                        <span class="loading loading-spinner"></span>
                    </Show>
                    {props.yes ?? "Yes"}
                </button>
                <button class="btn btn-ghost" disabled={loading()}>
                    {props.no ?? "No"}
                </button>
            </div>
        </Modal>
    );
};

export default Ask;
