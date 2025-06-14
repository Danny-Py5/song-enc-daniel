import AsyncStorage from "@react-native-async-storage/async-storage";

export enum ApStorageKeys {
  Auth = "@auth",
}

export class ApStorageService {
  public static async getItem(key: ApStorageKeys) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
    }
  }

  public static async setItem(key: ApStorageKeys, value: any) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
    }
  }

  public static async removeItem(key: ApStorageKeys) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
    }
  }

  public static async clear() {
    await AsyncStorage.clear();
  }
}
