import { createEffect, createSignal, type Component } from "solid-js";
import style from "./App.module.css";
import poptip from "poptip";

const { sendMessage } = window.apis;

const App: Component = () => {
    const [file, setFile] = createSignal<DocInfo | null>(null);
    createEffect(() => {
        const name = file()?.name ?? "PaDFoot";
        document.getElementsByTagName("title")[0].innerText = name;
    });

    async function openFile() {
        try {
            const info = await sendMessage("open", undefined);
            console.log(info);
            if (info) {
                setFile(info);
            }
        } catch (e) {
            poptip.error(`${e}`);
        }
    }

    return (
        <>
            <header class={style.header}>
                <div>
                    <div class="dropdown">
                        <div tabIndex={0} role="button" class="btn">
                            <i class="bi bi-layout-sidebar-inset"></i>
                        </div>
                        <ul
                            tabIndex={0}
                            class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                        >
                            <li>
                                <a>Item 1</a>
                            </li>
                            <li>
                                <a>Item 2</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <button class="btn rounded-full" onClick={openFile}>
                        <i class="bi bi-file-pdf"></i>
                        Open
                    </button>
                </div>
                <div></div>
            </header>
            <div class={style.sidebar}>
                <ul class="menu bg-base-200 rounded-box w-full">
                    <li>
                        <a>Item 1</a>
                    </li>
                    <li>
                        <details open>
                            <summary>Parent</summary>
                            <ul>
                                <li>
                                    <a>Submenu 1</a>
                                </li>
                                <li>
                                    <a>Submenu 2</a>
                                </li>
                                <li>
                                    <details open>
                                        <summary>Parent</summary>
                                        <ul>
                                            <li>
                                                <a>Submenu 1</a>
                                            </li>
                                            <li>
                                                <a>Submenu 2</a>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <a>Item 3</a>
                    </li>
                </ul>
            </div>
            <div class={style.main}></div>
        </>
    );
};

export default App;
