import { BootScript } from '@mean-expert/boot-script';

@BootScript()
class RoleResolver {
    models: any;
    Role: any;

    constructor(app: any) {
        this.models = app.models;
        this.Role = app.models.Role;

        // setup roles
        this.$adminRole();
        this.$storeUserRole();
        this.$storeAdminRole();
    }


    $adminRole() {
        this.Role.registerResolver('$admin', (role, ctx, cb) => {
            var userId = ctx.accessToken.userId;
            if (!userId) return process.nextTick(() => cb(null, false));

            this.models.StoreUser.findById(userId, (err, storeUser) => {
                storeUser = storeUser || {};
                // storeId below 0 = admin!
                const isAdmin = (storeUser.storeId < 0);
                return cb(null, isAdmin);
            })
        });
    }

    
    $storeUserRole() {
        this.Role.registerResolver('$storeUser', (role, ctx, cb) => {
            var userId = ctx.accessToken.userId;
            if (!userId) return process.nextTick(() => cb(null, false));

            this.models.StoreUser.findById(userId, (err, storeUser) => 
                cb(null, !!storeUser)
            );
        });
    }


    $storeAdminRole() {
        this.Role.registerResolver('$storeAdmin', (role, ctx, cb) => {
            
            const userId = (ctx.accessToken || {}).userId;
            if (!userId) return process.nextTick(() => cb(null, false));

            const findUserTask = new Promise<any>((resolve, reject) => {
                // console.log('find user...', userId);
                this.models.StoreUser.findById(userId, (err, storeUser) => resolve(storeUser))
            });
            const findModelTask = new Promise<any>((resolve, reject) => {
                // console.log('find model...', ctx.modelName, ctx.modelId);
                ctx.model.findOne({ 
                    where: { id: ctx.modelId }, 
                    isDeleted: true 
                }, (err, modelObj) => resolve(modelObj))
            });

            Promise.all([findUserTask, findModelTask])
                .then(([user, model]) => {
                    user = user || {};
                    model = model || {};

                    // console.log('user.id', user.id);
                    // console.log('model.id', model.id);

                    const isAdmin = (user.storeId < 0);
                    const isStoreUser = (user.storeId === model.storeId && user.storeId);
                    const isStoreAdmin = isStoreUser || isAdmin;
                    return cb(null, isStoreAdmin);
                })
                .catch(err => cb(null, false));

        });
    }

}

module.exports = RoleResolver;
