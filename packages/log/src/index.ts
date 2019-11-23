import { performance } from "perf_hooks";

const colors = [
  20,
  21,
  26,
  27,
  32,
  33,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  56,
  57,
  62,
  63,
  68,
  69,
  74,
  75,
  76,
  77,
  78,
  79,
  80,
  81,
  92,
  93,
  98,
  99,
  112,
  113,
  128,
  129,
  134,
  135,
  148,
  149,
  160,
  161,
  162,
  163,
  164,
  165,
  166,
  167,
  168,
  169,
  170,
  171,
  172,
  173,
  178,
  179,
  184,
  185,
  196,
  197,
  198,
  199,
  200,
  201,
  202,
  203,
  204,
  205,
  206,
  207,
  208,
  209,
  214,
  215,
  220,
  221
];

const nano = 1000000;

const encode = (str: string, n: number) =>
  str.split("").reduce((sum, char) => char.charCodeAt(0) + sum, 0) % n;

const useColor = process.stdout.isTTY && process.stdout.hasColors(256);

const createLog = (namespace: string) => {
  const color = colors[encode(namespace, colors.length)];
  const colorCode = "\u001B[3" + (color < 8 ? color : "8;5;" + color);
  const prefix = useColor
    ? `  ${colorCode};1m${namespace} \u001B[0m`
    : `  ${namespace}`;
  let lastLogAt: number;
  return (parts: TemplateStringsArray, ...variables: any[]) => {
    const message = parts.map((part, index) =>
      [
        part,
        variables[index]
          ? useColor
            ? `\u001b[33m${variables[index]}\u001B[0m`
            : variables[index]
          : undefined
      ].join("")
    );
    const postfix = lastLogAt ? ` ${lastLogAt / nano}ns` : "";
    console.log(`${prefix} ${message}${postfix}`);
    lastLogAt = performance.now();
  };
};

export default createLog;
