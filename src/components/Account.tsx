import { useEffect, useState } from "preact/hooks";
import * as qrcode from "qrcode";
import { useRef } from "react";

export interface Account {
    _id: number;
    category: string;
    counter: number;
    email: string;
    issuer: string;
    original_name: string;
    position: number;
    provider: number;
    secret: string;
    timestamp: string;
    type: number;
    uid: string;
}

interface AccountQRProps {
    name: string;
    issuer: string;
    secret: string;
}

const AccountQR: preact.FunctionalComponent<AccountQRProps> = ({ name, issuer, secret }) => {
    const canvasRef = useRef<HTMLCanvasElement>();

    useEffect(() => {
        const uri = `otpauth://totp/${encodeURIComponent(name)}?secret=${encodeURIComponent(secret)}&issuer=${encodeURIComponent(issuer)}`;
        qrcode.toCanvas(canvasRef.current, uri);
    }, [name, issuer, secret]);

    return <canvas ref={canvasRef} width="512px" height="512px" />;
};

interface AccountViewProps {
    account: Account;
    shown?: boolean;
}

export const AccountView: preact.FunctionalComponent<AccountViewProps> = ({ account, shown }) => {
    let origName = account.original_name;
    let issuer = account.issuer;
    if (account.original_name.includes(":")) {
        const spl = account.original_name.split(":");
        issuer = spl[0];
        origName = spl[1];
    }

    return <div>
        {shown && <AccountQR name={origName} issuer={issuer} secret={account.secret} />}
        <p>{origName} from {issuer} -- [ {account.original_name} / {account.issuer} ]</p>
    </div>;
};

interface AccountListProps {
    accounts: Account[];
}

export const AccountList: preact.FunctionalComponent<AccountListProps> = ({ accounts }) => {
    const [currentlyShown, setCurrentlyShown] = useState<number>();

    return <div>
        <h3>Accounts</h3>
        {accounts.map((m, i) => (<div key={i}>
            <button onClick={() => setCurrentlyShown(i)}>Show</button>
            <AccountView account={m} shown={currentlyShown === i} />
            <hr />
        </div>))}
    </div>;
};
