import { useState } from "preact/hooks";
import { Account } from "./components/Account";
import { FileDropZone } from "./components/FileDropZone";
import { AccountList } from "./components/Account";

export const App: preact.FunctionalComponent = () => {
    const [accounts, setAccounts] = useState<Account[]>();

    const onFileDrop = (file: string) => {
        const accts = JSON.parse(file) as Account[];
        setAccounts(accts);
    };

    return <div>
        <h2>Authenticator+ Exporter</h2>
        <div>
            {accounts ? <AccountList accounts={accounts} /> : <FileDropZone onFileDrop={onFileDrop} />}
        </div>
    </div>;
};
