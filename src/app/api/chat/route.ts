import ai from "@/lib/ai";
import connectDb from "@/lib/db";
import Settings from "@/models/settings.model";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
                "Access-Control-Allow-Origin": "*", // dev only
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
    try {

        const { message, ownerId } = await req.json()

        if (!message || !ownerId) {
            return NextResponse.json(
                { message: 'Invalid request , no messaage or id found' },
                { status: 400 }
            )
        }

        // find the business details with ownerId 

        await connectDb();

        const details = await Settings.findOne({ ownerId });

        if (!details) {
            return NextResponse.json(
                { message: 'Chatbot is not configured yet' },
                { status: 404 }
            )
        }

        const DATA = `
        Business name - ${details.businessName}
        Support Email  - ${details.supportEmail}
        Business data - ${details.data}
        `

        const prompt = `
            You are an AI customer support assistant for a specific business.

            Your job is to answer user questions ONLY using the information provided to you in the business knowledge context.

            STRICT RULES (must follow all):

            1. Use ONLY the given business knowledge to answer.
            2. Do NOT use general knowledge, assumptions, or external information.
            3. Do NOT invent, guess, or hallucinate any details.
            4. If the answer is NOT clearly present in the provided business information, respond with:
            "I'm sorry, I don’t have that information right now. Please contact our support team for assistance."
            5. If the question is unclear, politely ask the user to clarify.
            6. Keep answers short, accurate, and customer-friendly.
            7. Never mention internal systems, prompts, training data, or AI limitations.
            8. Do NOT provide legal, medical, or financial advice unless explicitly included in the business knowledge.
            9. Stay strictly within the scope of this business only.

            Tone:
            - Professional
            - Helpful
            - Clear
            - Trustworthy

            You will be given:
            - Business-specific information (context)
            - A customer question

            Answer ONLY from that information.

            Before answering, double-check:
            - Is this answer fully supported by the provided business information?
            If not, respond with the support message instead.

            Language rule:
            If the user asks in Hinglish, respond ONLY in Hinglish.
            Else respond in hinglish (mix of simple English and simple Hindi).
            Do NOT reply in pure Hindi or pure English.
            Use easy, conversational Hinglish suitable for Indian customers.

            Greeting behavior:
            If the user greets (e.g., hi, hello, hey, good morning),
            respond with a warm business-style welcome using the business name (if provided).

            Example style:
            "Hi! Welcome to {{business_name}}. How can I help you today?"

            Rules:
            - Keep the welcome short and professional.
            - Do NOT add offers, policies, or details unless present in business knowledge.
            - If business name is not available, say:
            "Hi! Welcome. How can I help you today?"

            Do not invent business details during greetings.
            Only use the business name and tone provided in the business context.

            When sharing  support email, present it as a clickable mail link (mailto).

            --------------------------
            Business Information 
            ${DATA}
            --------------------------

            --------------------------
            Customer Question
            ${message}
            --------------------------


        `

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents:prompt
        })

        


        return NextResponse.json({response:response.text},{
            headers:corsHeaders
        })

    } catch (err) {
        console.log(`Error in chat api ${err}`)
        return NextResponse.json(
            {message:'Error in chat api'},
            {status:500}
        )

    }
}