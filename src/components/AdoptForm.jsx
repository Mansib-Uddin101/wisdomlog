"use client"
import { Button, Input, Label, TextArea, TextField } from "@heroui/react";
import { usePathname } from "next/navigation";
import { authClient } from '@/lib/auth-client'; 
import { useState } from "react";
import toast from "react-hot-toast";

const AdoptForm = ({ petInfo }) => {
    const session = authClient.useSession()
    const userId = session?.data?.user?.id;
    const userName = session?.data?.user?.name;
    const userEmail = session?.data?.user?.email;
    const pathName = usePathname()
    const ownerId = petInfo.ownerId
    const petId = petInfo._id
    const petName = petInfo.name

    
    
    
    const isOwner = userId === ownerId;
    const isAdopted = petInfo.status === "adopted"
    console.log(isAdopted);
    
    
    const currentUser = {
        name: userName,
        email: userEmail
    };

    const [formData, setFormData] = useState({
        pickupDate: "",
        message: ""
    });
    
    const todayStr = new Date().toISOString().split('T')[0];
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFormAction = async () => {
        setIsSubmitting(true);

        const finalData = {
            requesterName: userName || "",
            petId: petId || "",
            ownerId: ownerId || "",
            requesterId: userId || "",
            petName: petName || "",
            status: "Pending",
            requestDate: new Date().toISOString(),
            message: formData.message || "",
            pickupDate: formData.pickupDate ? new Date(formData.pickupDate).toISOString() : ""
        };

        try {
            const response = await fetch('http://localhost:8000/requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalData),
            });

            if (!response.ok) {
                return toast.error('You already submitted request!');
            }

            toast.success("Adoption request submitted successfully! 🐾");
            
            setFormData({ pickupDate: "", message: "" });

        } catch (error) {
            console.error("Submission Error:", error);
            toast.error(error.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
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
                        className={"focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all border"}
                    />
                </TextField>
                
                <TextField className="w-full" name="message" isRequired>
                    <Label>Message to Owner</Label>
                    <TextArea
                        rows={4}
                        placeholder="Tell us a bit about your experience with pets..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={"focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all border"}
                    />
                </TextField>
                
                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                    {pathName === "/all" && (
                        <Button slot="close" type="button" className="text-[#315579] text-[16px] bg-slate-50 border border-[#315579]">
                            Cancel
                        </Button>
                    )}
                    {isOwner? (<Button
                        type="submit"
                        isDisabled={isOwner}
                        className={`text-white text-[16px] transition-all bg-gray-400 cursor-not-allowed" ${pathName === "/all" ? "" : "w-full"}`}
                    >
                        You own this pet
                    </Button>):(<Button
                        type="submit"
                        isDisabled={isAdopted}
                        className={`text-white text-[16px] transition-all ${
                            isAdopted 
                            ? "bg-gray-400 cursor-not-allowed" 
                            : "bg-[#D66237] hover:bg-[#b54f2a] cursor-pointer"
                        } ${pathName === "/all" ? "" : "w-full"}`}
                    >
                        {isAdopted ? "Pet Adopted!" : "Request Adoption"}
                    </Button>)}
                    
                </div>
            </form>
        </div>
    )
}

export default AdoptForm;