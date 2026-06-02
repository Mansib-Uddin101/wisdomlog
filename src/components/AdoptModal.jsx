"use client";

import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useState } from "react";
import AdoptForm from "./AdoptForm";

export function AdoptModal({ petInfo }) {
    const petName = petInfo.name;
    
    

    return (
        <Modal>
            <Button className='w-full py-2.5 px-4 rounded-xl bg-[#D66237] text-white font-semibold transition-all hover:scale-105 duration-300 active:bg-[#ae4725] shadow-sm cursor-pointer'>
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
                                <AdoptForm petName={petName}/>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}