import { serialize } from "../serialize";

/**
 * Calculates the difference between two objects and returns a list of differences.
 *
 * @param {any} obj1 - The first object to compare.
 * @param {any} obj2 - The second object to compare.
 * @param {HashOptions} [opts={}] - Configuration options for hashing the objects. See {@link HashOptions}.
 * @returns {DiffEntry[]} An array with the differences between the two objects.
 */
export function diff(obj1: any, obj2: any): DiffEntry[] {
  const h1 = _toHashedObject(obj1);
  const h2 = _toHashedObject(obj2);
  return _diff(h1, h2);
}

function _diff(h1: DiffHashedObject, h2: DiffHashedObject): DiffEntry[] {
  const diffs = [];

  const allProps = new Set([
    ...Object.keys(h1.props || {}),
    ...Object.keys(h2.props || {}),
  ]);
  if (h1.props && h2.props) {
    for (const prop of allProps) {
      const p1 = h1.props[prop];
      const p2 = h2.props[prop];
      if (p1 && p2) {
        diffs.push(..._diff(h1.props?.[prop], h2.props?.[prop]));
      } else if (p1 || p2) {
        diffs.push(
          new DiffEntry((p2 || p1).key, p1 ? "removed" : "added", p2, p1),
        );
      }
    }
  }

  if (allProps.size === 0 && h1.hash !== h2.hash) {
    diffs.push(new DiffEntry((h2 || h1).key, "changed", h2, h1));
  }

  return diffs;
}

function _toHashedObject(obj: any, key = ""): DiffHashedObject {
  if (obj && typeof obj !== "object") {
    return new DiffHashedObject(key, obj, serialize(obj));
  }
  const props: Record<string, DiffHashedObject> = {};
  const hashes = [];
  for (const _key in obj) {
    props[_key] = _toHashedObject(obj[_key], key ? `${key}.${_key}` : _key);
    hashes.push(props[_key].hash);
  }
  return new DiffHashedObject(key, obj, `{${hashes.join(":")}}`, props);
}

// --- Internal classes ---

export class DiffEntry {
  constructor(
    public key: string,
    public type: "changed" | "added" | "removed",
    public newValue: DiffHashedObject,
    public oldValue?: DiffHashedObject,
  ) {}

  toString() {
    return this.toJSON();
  }

  toJSON() {
    switch (this.type) {
      case "added": {
        return `Added   \`${this.key}\``;
      }
      case "removed": {
        return `Removed \`${this.key}\``;
      }
      case "changed": {
        return `Changed \`${this.key}\` from \`${
          this.oldValue?.toString() || "-"
        }\` to \`${this.newValue.toString()}\``;
      }
    }
  }
}

export class DiffHashedObject {
  constructor(
    public key: string,
    public value: any,
    public hash?: string,
    public props?: Record<string, DiffHashedObject>,
  ) {}

  toString() {
    if (this.props) {
      return `{${Object.keys(this.props).join(",")}}`;
    } else {
      return JSON.stringify(this.value);
    }
  }

  toJSON() {
    const k = this.key || ".";
    if (this.props) {
      return `${k}({${Object.keys(this.props).join(",")}})`;
    }
    return `${k}(${this.value})`;
  }
}
