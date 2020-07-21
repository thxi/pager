import commander from 'commander';

const { program } = commander;

program
  .option(
    '-p, --pages <number>',
    'maximum number of simultaneously open pages',
    '100'
  )
  .option(
    '-l, --log-level <level>',
    'log level;\nAvailable values are:\nALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF ',
    'ALL'
  );

program.parse(process.argv);

export default program;
