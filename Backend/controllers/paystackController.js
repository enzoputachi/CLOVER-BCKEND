import axios from "axios";
import pathFinder from "../utils/pathfinder.js";

// Find the .env file and load the PAYSTACK SECRET KEY contents
pathFinder();

const handleInitializeTransaction = async (req, res) => {
    const { email, amount } = req.body;

    try {
        const response = await axios.post( 'https://api.paystack.co/transaction/initialize', 
            { 
                email: email, amount: amount 
            }, 
            { 
                headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
                'Content-Type': 'application/json'
            })        

        res.status(200).json({ 
            message: 'Transaction initialized',
            status: 'success',
            data: response.data.data
        })
    } catch (error) {
        console.error('Paystack Init Error:', error?.response?.data || error.message);
        res.status(500).json({ message: 'Transaction initaialization failed', error: error?.response?.data || error.message})
    }
}

const handleVerifyTransaction = async (req, res) => {
    const { reference } = req.params;

    try {       
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, 
            {
                headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`}
            }
        );
        console.log("Verification response: ", response.data);
        
        const {status, data: txn } = response.data;

         // First, ensure Paystack call itself succeeded
        if (!status) {
            return res.status(502).json({ message: "Gateway error verifying transaction" });
        }

        if (txn.status === "success") {
            res.status(200).json({ message: 'Payment verified successfully', data: txn });
        } else {
            // Payment failed
            res.status(400).json({ message: 'Payment failed', data: txn });
        }
    } catch (error) {
        console.error("Verification error:", error.response?.data || error.message);
        return res.status(500).json({ error: "Verification failed" });
    }
}

export {
    handleInitializeTransaction,
    handleVerifyTransaction,
};

