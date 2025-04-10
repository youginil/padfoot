import { createSignal, onMount, type Component } from "solid-js";

const apis = window.apis;

const App: Component = () => {
    const [name, setName] = createSignal("");
    onMount(async () => {
        const name = await apis.sendMessage("hello", undefined);
        setName(name);
    });
    return <button class="btn">Hello {name()}</button>;
};

export default App;
