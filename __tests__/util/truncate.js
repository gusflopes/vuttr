import database from '../../src/database';

export default function truncate() {
  return Promise.all(
    Object.values(database.connection.models).map(model => {
      return model.destroy({ truncate: true });
    })

    /* SQLITE3
    Object.keys(database.connection.models).map(key => {
      return database.connection.models[key].destroy({
        truncate: true,
        force: true,
      });
    })
    */
  );
}
