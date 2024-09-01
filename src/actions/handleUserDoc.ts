import { createDoc, findDoc } from "./firebaseClientCalls";


export default async function handleUserDocument(user: User | any) {
  if (!user?.uid) {
    console.error("no user id");
    return { success: false, response: "No user Id" };
  }
  try {
    const userDoc = await findDoc("users", user?.uid) || null;
    // const settings: Settings = { temp: "temp" }
    // const userDocSettings = userDoc.doc?.settings || {};
    // const settingsKeys = Object.keys(settings);
    // let updatedSettings = null;

    // const missingSettings = settingsKeys.filter(key => userDocSettings[key] === undefined);

    // if (missingSettings.length > 0) {
    //   updatedSettings = { ...userDocSettings, ...Object.fromEntries(missingSettings.map(key => [key, settings[key]])) };
    //   await updateDoc("users", user?.uid, { settings: updatedSettings });
    // }

    if (!userDoc.doc) {
      const userData = {
        id: user?.uid,
        email: user?.email || null,
        avatar: user?.photoURL || null,
        createdAt: new Date() || null,
        //settings,
        createdBy: user?.uid,
      };
      await createDoc("users", userData, userData?.id)
      return { success: true, response: userData };
    } else return {
      success: true, response:
        //updatedSettings ? { ...userDoc?.doc, settings: updatedSettings } : 
        userDoc?.doc
    };
  } catch (error: any) {
    console.error("error handling user doc", error.message || error?.code)
    return { success: false, response: error?.code?.split?.("/")?.[1] || error?.code || error?.message };
  }
}