"use client";
import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

export type AlertTypes = "success" | "info" | "error" | "warning" | "custom";
interface IAlertContent {
  type: AlertTypes;
  title?: string | JSX.Element;
  description?: string | JSX.Element;
  onCancel?: () => void;
  onConfirm: () => void;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
}

export interface IModal {
  id: string;
  content?: any;
}

export interface IGeneral {
  isOpenMenu: boolean;

  currentAlert?: IAlertContent;

  modalStatus?: IModal;
}

export interface IGeneralActions {
  setIsOpenMenu: (isOpen: boolean) => void;
  logout: () => void;
  setCurrentAlert: (currentAlert?: IAlertContent) => void;
  setModalStatus: (status?: IModal) => void;
}

export type IGeneralStore = IGeneral & IGeneralActions;

const storeApi: StateCreator<
  IGeneralStore,
  [["zustand/devtools", never], ["zustand/immer", never]]
> = (set, get) => ({
  isOpenMenu: false,

  setIsOpenMenu: (isOpen) => {
    set(
      (state) => {
        state.isOpenMenu = isOpen;
      },
      false,
      { type: "" }
    );
  },

  logout: () => {},

  setCurrentAlert: (currentAlert) => {
    set((state) => {
      state.currentAlert = currentAlert;
    });
  },

  setModalStatus: (status) => {
    set((state) => {
      state.modalStatus = status;
    });
  },
});

export const useGeneral = createWithEqualityFn<IGeneralStore>()(
  devtools(
    persist(immer(storeApi), {
      name: "generalStore",
      // { anonymousActionType: 'general' }

      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !["modalStatus", "currentAlert"].includes(key)
          )
        ),
    }),
    { name: "general-store", anonymousActionType: "general" }
  )
);

// basic store functions
export const setter = useGeneral.setState;
export const getter = useGeneral.getState;

export const fireAlert = (alert?: IAlertContent) => {
  return new Promise((resolve) => {
    setter((state) => {
      state.currentAlert = {
        ...alert,
        type: alert?.type || "info",
        onConfirm: async () => {
          if (alert?.onConfirm) {
            await alert.onConfirm();
            closeAlert();
          }
          resolve(true);
        },
        onCancel: () => {
          if (alert?.onCancel) {
            alert.onCancel();
          }
          closeAlert();
          resolve(false);
        },
      };
    });

    // setter((state) => state.currentAlert = alert)
  });
};

export const closeAlert = () => {
  setter((draft) => {
    draft.currentAlert = undefined;
  });
};

/**
 * return general state value and/or funtions implementing a shallow option
 * @param selector funtions selector
 * @returns
 */
export const useShallowGeneralStore = <U>(
  selector: (state: IGeneral & IGeneralActions) => U
) => {
  return useGeneral(selector, shallow);
};
