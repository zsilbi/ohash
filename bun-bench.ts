import { bench, group, run, summary } from "mitata";

const versions = {
  // "ohash v2.0.0": await import("./src/bench/serialize-v2.0.0"),
  // "ohash v2.0.1": await import("./src/bench/serialize-v2.0.1"),
  // "ohash v2.0.2": await import("./src/bench/serialize-v2.0.2"),
  // "ohash v2.0.3": await import("./src/bench/serialize-v2.0.3"),
  // "ohash v2.0.4": await import("./src/bench/serialize-v2.0.4"),
  // "ohash v2.0.5": await import("./src/bench/serialize-v2.0.5"),
  // "ohash v2.0.6": await import("./src/bench/serialize-v2.0.6"),
  // "ohash v2.0.7": await import("./src/bench/serialize-v2.0.7"),
  // "ohash v2.0.8": await import("./src/bench/serialize-v2.0.8"),
  // "ohash v2.0.9": await import("./src/bench/serialize-v2.0.9"),
  // "ohash v2.0.10": await import("./src/bench/serialize-v2.0.10"),
  "ohash v2.0.11": await import("./src/bench/serialize-v2.0.11"),
  "ohash @ dev": await import("./src/bench/serialize-v2.0.12"),
};

// group("serialize", () => {
//   // Options for v1
//   const hashOptions = { unorderedArrays: true, unorderedSets: true };

//   group("simple object", () => {
//     const object = {
//       string: "test",
//       number: 42,
//       boolean: true,
//       nullValue: null,
//       undefinedValue: undefined,
//     };

//     summary(() => {
//       bench("ohash v1.1.5", () => {
//         objectHash(object, hashOptions);
//       });

//       for (const [name, version] of Object.entries(versions)) {
//         bench(name, () => {
//           version.serialize(object);
//         });
//       }
//     });
//   });

//   group("circular object", () => {
//     const object: any = {
//       string: "test",
//       number: 42,
//       boolean: true,
//       nullValue: null,
//       undefinedValue: undefined,
//     };

//     object.object = object;

//     summary(() => {
//       bench("ohash v1.1.5", () => {
//         objectHash(object, hashOptions);
//       });

//       for (const [name, version] of Object.entries(versions)) {
//         bench(name, () => {
//           version.serialize(object);
//         });
//       }
//     });
//   });

//   group("array of 100 simple objects", () => {
//     const object = {
//       string: "test",
//       number: 42,
//       boolean: true,
//       nullValue: null,
//       undefinedValue: undefined,
//     };

//     const array: any[] = [];

//     for (let i = 0; i < 100; i++) {
//       array.push({ ...object });
//     }

//     summary(() => {
//       bench("ohash v1.1.5", () => {
//         objectHash(array, hashOptions);
//       });

//       for (const [name, version] of Object.entries(versions)) {
//         bench(name, () => {
//           version.serialize(array);
//         });
//       }
//     });
//   });

//   group("array of 100 simple objects (by reference)", () => {
//     const object = {
//       string: "test",
//       number: 42,
//       boolean: true,
//       nullValue: null,
//       undefinedValue: undefined,
//     };

//     const array: any[] = [];

//     for (let i = 0; i < 100; i++) {
//       array.push(object);
//     }

//     summary(() => {
//       bench("ohash v1.1.5", () => {
//         objectHash(array, hashOptions);
//       });

//       for (const [name, version] of Object.entries(versions)) {
//         bench(name, () => {
//           version.serialize(array);
//         });
//       }
//     });
//   });

//   group("complex object", () => {
//     const object = {
//       regex: /.*/,
//       url: new URL("https://example.com"),
//       symbol: Symbol("test"),
//       bigint: 9_007_199_254_740_991n,
//       set: new Set([1, 2, 3, {}]),
//       map: new Map<any, any>([["key", "value"]]),
//       array: [1, 2, "x", 3],
//     };

//     for (let i = 0; i < 50; i++) {
//       object.set.add(i);
//       object.set.add(Symbol(i));
//       object.set.add(`${i}`);
//       object.map.set(i, `${i}`);
//     }

//     summary(() => {
//       bench("ohash v1.1.5", () => {
//         objectHash(object, hashOptions);
//       });

//       for (const [name, version] of Object.entries(versions)) {
//         bench(name, () => {
//           version.serialize(object);
//         });
//       }
//     });
//   });

//   group("dates", () => {
//     const object: any = {
//       dates: [],
//     };

//     for (let i = 0; i < 100; i++) {
//       object.dates.push(new Date(i));
//     }

//     summary(() => {
//       bench("ohash v1.1.5", () => {
//         objectHash(object, hashOptions);
//       });

//       for (const [name, version] of Object.entries(versions)) {
//         bench(name, () => {
//           version.serialize(object);
//         });
//       }
//     });
//   });

//   group("typed arrays and buffer", () => {
//     const buffer = new ArrayBuffer(4096);

//     const object = {
//       int8Array: new Int8Array(buffer),
//       uint8Array: new Uint8Array([1, 2, 3]),
//       uint8ClampedArray: new Uint8ClampedArray([1, 2, 3]),
//       int16Array: new Int16Array(buffer),
//       uint16Array: new Uint16Array([1, 2, 3]),
//       int32Array: new Int32Array(buffer),
//       uint32Array: new Uint32Array([1, 2, 3]),
//       float32Array: new Float32Array(buffer),
//       float64Array: new Float64Array([1, 2, 3]),
//       bigInt64Array: new BigInt64Array(buffer),
//       bigUint64Array: new BigUint64Array([1n, 2n, 3n]),
//       buffer: Buffer.from("hello"),
//     };

//     summary(() => {
//       bench("ohash v1.1.5", () => {
//         objectHash(object, hashOptions);
//       });

//       for (const [name, version] of Object.entries(versions)) {
//         bench(name, () => {
//           version.serialize(object);
//         });
//       }
//     });
//   });

//   group("classes/functions/nested objects", () => {
//     const object = {
//       nestedObject: { a: 1, b: 2 },
//       classInstance: new (class Test {
//         x = 1;
//       })(),
//       toJSONInstance: new (class Test {
//         toJSON() {
//           return [1, 2, 3];
//         }
//       })(),
//       formData: (() => {
//         const form = new FormData();
//         form.set("foo", "bar");
//         form.set("bar", "baz");
//         return form;
//       })(),
//       nativeFunction: Array,
//       customFunction: function sum(a: number, b: number) {
//         return a + b;
//       },
//       arrowFunction: (a: number, b: number) => a + b,
//       asyncFunction: async (a: number, b: number) => a + b,
//       generatorFunction: function* () {
//         yield 1;
//         yield 2;
//         yield 3;
//       },
//       asyncGeneratorFunction: async function* () {
//         yield 1;
//         yield 2;
//         yield 3;
//       },
//     };

//     summary(() => {
//       bench("ohash v1.1.5", () => {
//         objectHash(object, hashOptions);
//       });

//       for (const [name, version] of Object.entries(versions)) {
//         bench(name, () => {
//           version.serialize(object);
//         });
//       }
//     });
//   });
// });

group("serialize", () => {
  const presets: BenchObjectPreset[] = [
    { count: 1, size: "small" },
    // { count: 1, size: "small", circular: true },
    // { count: 1, size: "large" },
    // { count: 1, size: "large", circular: true },
    // {
    //   count: 1024,
    //   size: "small",
    //   referenced: true,
    // },
    // {
    //   count: 1024,
    //   size: "small",
    //   circular: true,
    //   referenced: true,
    // },
    // {
    //   count: 512,
    //   size: "large",
    //   referenced: true,
    // },
    // {
    //   count: 512,
    //   size: "large",
    //   circular: true,
    //   referenced: true,
    // },
    {
      count: 256,
      size: "small",
    },
    // {
    //   count: 256,
    //   size: "small",
    //   circular: true,
    // },
    // {
    //   count: 128,
    //   size: "large",
    // },
    // {
    //   count: 128,
    //   size: "large",
    //   circular: true,
    // },
  ];

  for (const preset of presets) {
    const title = JSON.stringify(preset)
      .replace(/[{"}]/g, "")
      .replace(/,/g, ", ");
    const objects = createBenchObjects(preset);

    group(title, () => {
      summary(() => {
        // bench("ohash v1.1.5", () => {
        //   objectHash(objects, {
        //     unorderedArrays: true,
        //     unorderedSets: true,
        //   });
        // });

        for (const [name, version] of Object.entries(versions)) {
          bench(name, () => {
            version.serialize(objects);
          });
        }
      });
    });
  }
});

type BenchObjectPreset = {
  count: number;
  size: "small" | "large";
  circular?: boolean;
  referenced?: boolean;
};

function createBenchObjects({
  count = 100,
  size = "small",
  circular = false,
  referenced = false,
}: BenchObjectPreset) {
  let object: Record<string, any> = {
    string: "test",
    number: 42,
    boolean: true,
    nullValue: null,
    undefinedValue: undefined,
    date: new Date(0),
  };

  if (size === "large") {
    object = {
      ...object,
      regex: /.*/,
      url: new URL("https://example.com"),
      symbol: Symbol("test"),
      bigint: 9_007_199_254_740_991n,
      set: new Set([1, 2, 3, {}]),
      map: new Map<any, any>([["key", "value"]]),
      array: [1, 2, "x", 3],
      int8Array: new Int8Array([1, 2, 3]),
      uint8Array: new Uint8Array([1, 2, 3]),
      uint8ClampedArray: new Uint8ClampedArray([1, 2, 3]),
      int16Array: new Int16Array([1, 2, 3]),
      uint16Array: new Uint16Array([1, 2, 3]),
      int32Array: new Int32Array([1, 2, 3]),
      uint32Array: new Uint32Array([1, 2, 3]),
      float32Array: new Float32Array([1, 2, 3]),
      float64Array: new Float64Array([1, 2, 3]),
      bigInt64Array: new BigInt64Array([1n, 2n, 3n]),
      bigUint64Array: new BigUint64Array([1n, 2n, 3n]),
      buffer: Buffer.from("hello"),
      nestedObject: { a: 1, b: 2 },
      classInstance: new (class Test {
        x = 1;
      })(),
      toJSONInstance: new (class Test {
        toJSON() {
          return [1, 2, 3];
        }
      })(),
      formData: (() => {
        const form = new FormData();
        form.set("foo", "bar");
        form.set("bar", "baz");
        return form;
      })(),
      nativeFunction: Array,
      customFunction: function sum(a: number, b: number) {
        return a + b;
      },
      arrowFunction: (a: number, b: number) => a + b,
      asyncFunction: async (a: number, b: number) => a + b,
      generatorFunction: function* () {
        yield 1;
        yield 2;
        yield 3;
      },
      asyncGeneratorFunction: async function* () {
        yield 1;
        yield 2;
        yield 3;
      },
      circular: {},
    };
  }

  if (circular) {
    if (size === "small") {
      object.circular = object;
    }

    if (size === "large") {
      const circularObject = { ...object };

      circularObject.circular = object;
      /** These don't work with ohash v1 **/
      // circularObject.map.set("object", object);
      // circularObject.set.add(object);
      // circularObject.set.add(circularObject);

      // object.circular = circularObject;
      // object.map.set("object", object);
      // object.map.set("clonedObject", circularObject);
      // object.set.add(object);
      // object.set.add(circularObject);

      for (let i = 0; i < 1000; i++) {
        object.set.add(i);
        object.set.add(Symbol(i));
        object.set.add(`${i}`);
      }
    }
  }

  const objects: any = [];
  for (let i = 0; i < count; i++) {
    objects.push(referenced ? object : { ...object });
  }

  return objects;
}

await run();
