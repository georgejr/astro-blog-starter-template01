// Minimal argument parsing shared by the content CLIs.
//   positional args      -> args._
//   --flag value         -> args.flag = 'value'
//   --flag=value         -> args.flag = 'value'
//   --flag (last / before another --flag) -> args.flag = true
export interface ParsedArgs {
  _: string[];
  [flag: string]: string | boolean | string[];
}

export function parseArgs(argv: string[] = process.argv.slice(2)): ParsedArgs {
  const args: ParsedArgs = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (token === '--') continue;
    if (token.startsWith('--')) {
      const [name, inline] = token.slice(2).split(/=(.*)/s, 2);
      if (inline !== undefined) args[name] = inline;
      else if (i + 1 < argv.length && !argv[i + 1].startsWith('--')) args[name] = argv[++i];
      else args[name] = true;
    } else {
      args._.push(token);
    }
  }
  return args;
}

export function str(args: ParsedArgs, name: string): string | undefined {
  const value = args[name];
  return typeof value === 'string' ? value : undefined;
}

export function list(args: ParsedArgs, name: string): string[] {
  return (str(args, name) ?? '')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}

export function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}
