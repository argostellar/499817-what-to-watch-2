import chalk from 'chalk';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import { CliCommandInterface } from './cli-command.interface.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  public execute(filename: string): void {
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(chalk.gray(fileReader.toArray()));
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.log(`Не удалось импортировать данные из файла по причине: «${chalk.red(err.message)}»`);
    }
  }
}
