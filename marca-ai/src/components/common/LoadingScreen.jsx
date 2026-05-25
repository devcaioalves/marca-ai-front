import { useEffect, useState } from "react";
import "../../styles/loading.css";

export default function LoadingScreen({ ready, onDone }) {

    const [visible, setVisible] = useState(true);

    useEffect(() => {

        if (ready === undefined) return; 

        if (ready) {

            const t = setTimeout(() => setVisible(false), 80);

            return () => clearTimeout(t);
        }

    }, [ready]);

    function handleTransitionEnd() {

        if (!visible && onDone) onDone();
    }

    return (
        <div
            className={`loading-screen ${visible ? "ls-enter" : "ls-exit"}`}
            onTransitionEnd={handleTransitionEnd}
        >
            <div className="loading-content">
                <div className="loading-spinner" />
            </div>
        </div>
    );
}