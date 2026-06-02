"use client"
import { Button, Input, Label, TextArea, TextField } from "@heroui/react";
import Textarea from "daisyui/components/textarea";
import { div } from "framer-motion/client";
import { usePathname } from "next/navigation";
import { useState } from "react";

const AdoptForm = ({ petName }) => {
    const pathName = usePathname()
    console.log(pathName)
    const currentUser = {
        name: "John Doe",
        email: "johndoe@example.com"
    };

    const [formData, setFormData] = useState({
        pickupDate: "",
        message: ""
    });
    const todayStr = new Date().toISOString().split('T')[0];
    console.log(formData);

    const handleFormAction = async (formDataPayload) => {
        console.log("Final Data: ", formData);

        
    };
    return (
        <div>
            <form action={handleFormAction} className="flex flex-col gap-4">

                <input type="hidden" name="status" value="pending" />
                <TextField className="w-full" name="petName" type="text">
                    <Label>Pet Name</Label>
                    <Input value={petName} readOnly className="cursor-not-allowed opacity-70" />
                </TextField>
                <TextField className="w-full" name="userName" type="text">
                    <Label>Your Name</Label>
                    <Input value={currentUser.name} readOnly className="cursor-not-allowed opacity-70" />
                </TextField>
                <TextField className="w-full" name="userEmail" type="email">
                    <Label>Your Email</Label>
                    <Input value={currentUser.email} readOnly className="cursor-not-allowed opacity-70" />
                </TextField>
                <TextField className="w-full" name="pickupDate" type="date" isRequired>
                    <Label>Target Pickup Date</Label>
                    <Input
                        value={formData.pickupDate}
                        min={todayStr}
                        onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                    />
                </TextField>
                <TextField className="w-full" name="message" isRequired>
                    <Label>Message to  Owner</Label>
                    <TextArea
                        rows={4}
                        placeholder="Tell us a bit about your experience with pets..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                </TextField>
                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                    {pathName==="/all"? <Button slot="close" type="button" className="text-[#315579] text-[16px] bg-slate-50 border border-[#315579]">
                        Cancel
                    </Button> : ""}
                    
                    <Button
                        type="submit"
                        className={`bg-[#D66237] text-white hover:bg-[#b54f2a] text-[16px] cursor-pointer ${pathName==="/all" ? "": "w-full"}`}
                    >
                        Request Adoption
                    </Button>
                </div>

            </form>
        </div>
    )
}

export default AdoptForm
