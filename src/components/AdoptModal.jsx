"use client";

import { Button, Modal, Surface } from "@heroui/react";
import AdoptForm from "./AdoptForm";
import { authClient } from "@/lib/auth-client";

export function AdoptModal({ petInfo, petId }) {
    const petName = petInfo.name;
    const session = authClient.useSession();
    const userId = session?.data?.user?.id;
    const isOwner = userId === petInfo.ownerId;

    return (
        <Modal isOpen={isOwner ? false : undefined}>
            <Button 
                isDisabled={isOwner}
                className={`w-full py-2.5 px-4 rounded-xl font-semibold transition-all duration-300 shadow-sm ${
                    isOwner 
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                    : "bg-[#D66237] text-white hover:scale-105 active:bg-[#ae4725] cursor-pointer"
                }`}
            >
                Adopt Now
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Heading className="border bg-orange-50/50 text-[#D66237] w-fit mx-auto px-4 py-1.5 rounded-full font-bold">Adopt {petName}</Modal.Heading>
                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                Complete your request form info below. Apply directly and schedule a pick-up window.
                            </p>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <AdoptForm petInfo={petInfo}/>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}