import { Mark, mergeAttributes } from "@tiptap/core";

export interface TrackChangeMarkAttributes {
  id: string;
  author: string;
  authorId?: string;
  createdAt: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    trackInsertion: {
      setInsertion: (attributes: TrackChangeMarkAttributes) => ReturnType;
      unsetInsertion: () => ReturnType;
    };
    trackDeletion: {
      setDeletion: (attributes: TrackChangeMarkAttributes) => ReturnType;
      unsetDeletion: () => ReturnType;
    };
  }
}

export const TrackInsertion = Mark.create({
  name: "trackInsertion",

  addOptions() {
    return {
      HTMLAttributes: {
        class: "track-change-insertion",
      },
    };
  },

  addAttributes() {
    return {
      id: {
        default: null,
      },
      author: {
        default: "Anonymous",
      },
      authorId: {
        default: null,
      },
      createdAt: {
        default: () => new Date().toISOString(),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "ins[data-track-change]",
      },
      {
        tag: "span.track-change-insertion",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "ins",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-track-change": "insertion",
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setInsertion:
        (attributes) =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes);
        },
      unsetInsertion:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});

export const TrackDeletion = Mark.create({
  name: "trackDeletion",

  addOptions() {
    return {
      HTMLAttributes: {
        class: "track-change-deletion",
      },
    };
  },

  addAttributes() {
    return {
      id: {
        default: null,
      },
      author: {
        default: "Anonymous",
      },
      authorId: {
        default: null,
      },
      createdAt: {
        default: () => new Date().toISOString(),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "del[data-track-change]",
      },
      {
        tag: "span.track-change-deletion",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "del",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-track-change": "deletion",
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setDeletion:
        (attributes) =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes);
        },
      unsetDeletion:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});

