import { Box } from "/app/loginbox"; // Use a relative path
import { Topmenu } from "/app/topmenu"; // Use a relative path
import 'app/globals.css';

export default function Home() {
    return (
        <div className="font-Manrope">
        <div className="gradient-background">
            <Box />
            <Topmenu />
        </div>
        </div>
    );
}
