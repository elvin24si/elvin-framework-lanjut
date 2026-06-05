import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import { Badge } from "../components/ui/badge"; 

export default function Fiturxyz() {
    return (
        <div id="container">
            <PageHeader
                title="Fitur XYZ" />
            <div id="dashboard-grid" className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4">

            </div>
            <Button variant="outline" className="mt-5">Learn More</Button>
            <Button variant="destructive" className="mt-5">Delete</Button>
            <Button variant="secondary" className="mt-5">Secondary Action</Button>

            <Card className="mt-4 w-[380px]">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Belajar shadcn/ui</CardTitle>
                        <Badge variant="secondary">Baru</Badge>
                    </div>
                    <CardDescription>
                        Contoh penggunaan komponen shadcn/ui di React
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Komponen ini dibuat di branch <strong>setup-shadcn</strong>
                        lalu di-merge ke main.
                    </p>
                </CardContent>

                <CardFooter className="flex gap-2">
                    <Button>Simpan</Button>
                    <Button variant="outline">Batal</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
