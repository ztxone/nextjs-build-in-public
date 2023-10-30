"use server";
import { cookies } from "next/headers";
import type { StrapiMEResponse } from "@/types/strapi-custom-types";
import meAction from "./me-action";
import { revalidatePath } from "next/cache";

async function createEvent(formData: FormData) {
  const authToken = cookies().get("jwt")?.value;
  if (!authToken) return { error: "No JWT", ok: false };

  const data = (await meAction()) as StrapiMEResponse;
  const userId = data?.data?.id;
  if (!userId) return { error: "No user id", ok: false };

  const currentDataValue = formData.get("data");

  if (currentDataValue) {
    const dataObj = JSON.parse(currentDataValue as string);
    const newObject = { ...dataObj, user: { connect: [userId] } };
    const updatedDataValue = JSON.stringify(newObject);
    formData.set("data", updatedDataValue);
  }

  const eventResponse = await fetch(`${process.env.STRAPI_URL}/api/events`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: formData,
  });

  const eventData = await eventResponse.json();
  revalidatePath("/");
  revalidatePath("/events");
  return { ok: true, data: eventData };
}

export default createEvent;