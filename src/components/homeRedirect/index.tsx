
import {useEffect} from "react";
import {useRouter} from "next/router";

interface RedirectProps {
    to: string;
}
export default function Redirect({to}: RedirectProps) {
    const router = useRouter();
    useEffect(() => {
        router.push(to);
    }, [router, to]);
    return (
        <></>
    )
}