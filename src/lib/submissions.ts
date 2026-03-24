import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  query,
  orderBy,
  Timestamp,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "./firebase";

export type SubmissionStatus = "pending" | "approved" | "rejected";

export interface Submission {
  id: string;
  name: string;
  email: string;
  mobile: string;
  age: number;
  gender: string;
  address: string;
  plan: string;
  status: SubmissionStatus;
  createdAt: Date;
}

const COLLECTION = "submissions";

/** Add a new submission (status defaults to "pending") */
export async function addSubmission(data: {
  name: string;
  email: string;
  mobile: string;
  age: number;
  gender: string;
  address: string;
  plan: string;
}): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    status: "pending" as SubmissionStatus,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

/** Subscribe to all submissions in real-time (ordered by createdAt desc) */
export function subscribeToSubmissions(
  callback: (submissions: Submission[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snapshot) => {
      const submissions: Submission[] = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          age: data.age,
          gender: data.gender,
          address: data.address,
          plan: data.plan,
          status: data.status,
          createdAt: data.createdAt?.toDate?.() ?? new Date(),
        };
      });
      callback(submissions);
    },
    (error) => {
      console.error("Firestore subscription error:", error);
      onError?.(error);
    }
  );
}

/** Update submission status (admin use) */
export async function updateSubmissionStatus(
  id: string,
  status: SubmissionStatus
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), { status });
}
