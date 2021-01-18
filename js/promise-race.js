var ping = require('ping');
var chalk = require('chalk');
var inquirer = require('inquirer');
var registries = {
    taobao: 'https://registry.npm.taobao.org/'
}
var defaultRegistry ='https://registry.npmjs.org/';
ping.promise.probe('https://registry.npm.taobao.org/')
.then(function (res) {
    console.log('dsf',res.output);
});
console.log(ping);
async function shouldUseTaobao() {
    let faster
    try {
      faster = await Promise.race([
        ping.promise.probe(defaultRegistry),
        ping.promise.probe(registries.taobao)
      ]);
      console.log(faster,'---')
    } catch (e) {
        console.log(e);
        return save(false)
    }
  
    if (!faster.output.includes(registries.taobao)) {
      // default is already faster
      return save(false)
    }
  
    const { useTaobaoRegistry } = await inquirer.prompt([
      {
        name: 'useTaobaoRegistry',
        type: 'confirm',
        message: chalk.yellow(
          ` Your connection to the default registry seems to be slow.\n` +
            `   Use ${chalk.cyan(registries.taobao)} for faster installation?`
        )
      }
    ])
    return save(useTaobaoRegistry);
}
function save(useTaobaoRegistry){
    console.log('useTaobaoRegistry',useTaobaoRegistry);
}
shouldUseTaobao();