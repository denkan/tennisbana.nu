import { BootScript } from '@mean-expert/boot-script';

const path = require('path');

@BootScript()
class DbMigrate {
    app: any;
    models: any;
    datasources: any;

    constructor(app: any) {
        this.app = app;
        this.models = require(path.resolve(__dirname, '../model-config.json')); 
        this.datasources = require(path.resolve(__dirname, '../datasources.json'));

        this.autoUpdateAll();
    }

    autoUpdateAll(){
        Object.keys(this.models).forEach((key) => {
            if (typeof this.models[key].dataSource != 'undefined') {
                if (typeof this.datasources[this.models[key].dataSource] != 'undefined') {
                    this.app.dataSources[this.models[key].dataSource].autoupdate(key, (err: any) => {
                        if (err) throw err;
                        console.log('Model ' + key + ' updated');
                    });
                }
            }
        });
    }

    autoMigrateAll(){
        Object.keys(this.models).forEach((key) => {
            if (typeof this.models[key].dataSource != 'undefined') {
                if (typeof this.datasources[this.models[key].dataSource] != 'undefined') {
                    this.app.dataSources[this.models[key].dataSource].automigrate(key, (err: any) => {
                        if (err) throw err;
                        console.log('Model ' + key + ' migrated');
                    });
                }
            }
        });
    }

}

module.exports = DbMigrate;
