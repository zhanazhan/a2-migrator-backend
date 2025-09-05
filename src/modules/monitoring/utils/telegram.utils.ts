export class TelegramUtils {
  static escapeMarkdownMessage(input: string): string {
    const replaces = [
      {
        before: '.',
        after: '\\.',
      },
      {
        before: '_',
        after: '\\_',
      },
      {
        before: '*',
        after: '\\*',
      },
      {
        before: '#',
        after: '\\#',
      },
      {
        before: '[',
        after: '\\[',
      },
      {
        before: ']',
        after: '\\]',
      },
      {
        before: '(',
        after: '\\(',
      },
      {
        before: ')',
        after: '\\)',
      },
      {
        before: '-',
        after: '\\-',
      },
      {
        before: '`',
        after: '\\`',
      },
      {
        before: '$',
        after: '\\$',
      },
      {
        before: '<',
        after: '\\<',
      },
      {
        before: '>',
        after: '\\>',
      },
      {
        before: '{',
        after: '\\{',
      },
      {
        before: '}',
        after: '\\}',
      },
      {
        before: '+',
        after: '\\+',
      },
      {
        before: '=',
        after: '\\=',
      },
      {
        before: '!',
        after: '\\!',
      },
    ];
    let msg = input;
    for (const lookout of replaces) {
      msg = TelegramUtils.replaceAll(msg, lookout.before, lookout.after);
    }

    return msg;
  }

  public static replaceAll(
    target: string,
    search: string,
    replacement: string,
  ): string {
    return target.split(search).join(replacement);
  }
}
