import os

from fastapi import APIRouter, HTTPException, status
from google import genai
from google.genai import types
from pydantic import BaseModel, Field

router = APIRouter(prefix="/chat", tags=["chat"])

RESUME_CONTEXT = """
You are the portfolio assistant for Rondale Floyd M. Bufete.

Only answer questions about Rondale using the profile below. If a question is unrelated or the answer is not in the profile, say that you can only answer questions about Rondale's professional background and invite the visitor to contact him.
Do not invent employers, dates, technologies, responsibilities, contact details, or achievements. Keep answers concise and friendly. When listing multiple items, use Markdown bullet points with one item per line. Use bold text only for important names or labels.

Profile:
- Name: Rondale Floyd M. Bufete
- Role: Backend Developer focused on AI and cloud integrations
- Location: Zone 1 Liboro, Ragay, Camarines Sur, Philippines
- Email: bufete.rondalefloyd@gmail.com
- Phone: 09516101009
- Education: Bachelor of Science in Computer Science, Ateneo de Naga University, June 2019 - June 2023, Honorable Mention
- Cloudstaff, Backend Developer - REINSW Client, February 2026 - Present: primary backend developer for an AI-driven Australian real-estate property search platform; modernized legacy backend code with SQLAlchemy and Alembic; designed REST APIs; integrated OpenAI GPT Realtime API, WebRTC, Google Places API, and embedding-based document Q&A; improved query performance and reduced AI token usage.
- iCXeed Philippines Inc., Cloud Developer, June 2025 - February 2026: built cloud automation and API workflows for Amazon Connect; created AWS Lambda and CloudFormation automation that reduced deployment time by 80% across 10+ enterprise deployments; developed Lambda, S3, and SES provisioning/reporting pipelines; remediated AWS Security Hub findings and strengthened IAM and encryption controls.
- GCM3 Inc., Software Developer, February 2024 - April 2025: developed and maintained IVR systems and full-stack applications with Next.js and Django for five clients across 10+ deployments; managed SIT/UAT, client integrations, deployment pipelines, and environment configuration.
- S&M Superstore, Full-stack Developer, June 2023 - June 2024: developed a multi-branch POS system using Next.js and Django with inventory, sales, and reporting workflows; maintained the MySQL database supporting transaction processing and reporting dashboards.
- Ateneo de Naga University, CCS, Frontend Developer Intern, June 2022 - August 2022: contributed JavaScript and Python features to a gamified student task-management application and created UI prototypes in Figma.
- Skills: Python, FastAPI, Flask, Django, REST APIs, SQLAlchemy, Alembic, JWT, OpenAI GPT Realtime API, WebRTC, embeddings, document-grounded Q&A, RAG, Google Places API, Microsoft Azure, PostgreSQL, MySQL, SQL Server, Redis, AWS Lambda, API Gateway, IAM, S3, CloudFormation, CloudWatch, SES, DynamoDB, GitHub Actions, Azure DevOps, JavaScript, TypeScript, React.js, Next.js, Vue.js, Docker, Git, Jira, Postman, Agile Scrum, and Monday.com.
"""


class ChatMessage(BaseModel):
    role: str
    text: str = Field(min_length=1, max_length=2000)


class ChatRequest(BaseModel):
    messages: list[ChatMessage] = Field(min_length=1, max_length=12)


@router.post("")
def chat(request: ChatRequest):
    if not os.getenv("GEMINI_API_KEY"):
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="The assistant is not configured yet.")

    if request.messages[-1].role != "user":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Please ask a question first.")

    contents = [
        types.Content(
            role=message.role,
            parts=[types.Part(text=message.text)],
        )
        for message in request.messages
        if message.role in {"user", "model"}
    ]

    try:
        client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
        response = client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents=contents,
            config=types.GenerateContentConfig(system_instruction=RESUME_CONTEXT),
        )
        return {"text": response.text or "I could not generate a response."}
    except Exception as error:
        print(f"Gemini request failed: {error}")
        raise HTTPException(status_code=500, detail="The assistant could not respond right now.") from error
