'use client';

import { Side } from "@/components/Side";

export default function MainView(props) {
    let { children } = props;
    return (
        <div className={"main min-h-screen"}>
            <aside className={"w-1/6 p-4"}>
                <Side />
            </aside>
            <main className={"w-5/6 p-4"} style={{
                backgroundColor: "#F7FAFC"
            }}>
                {children}
            </main>
        </div>
    )
}