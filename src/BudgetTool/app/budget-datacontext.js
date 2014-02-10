﻿budget.factory('datacontext',
    ['breeze', 'Q', 'model', 'logger', '$timeout',
        function (breeze, Q, model, logger, $timeout) {

          logger.log("creating budget datacontext");
          var initialized;
          configureBreeze();

          var manager = new breeze.EntityManager("/api/Budget");
          manager.enableSaveQueuing(true);

          var datacontext = {
            metadataStore: manager.metadataStore,
            getBudgets: getBudgets,
            getCategories: getCategories,
            getBudgetData: getBudgetData,
            createBudget: createBudget,
            createCategory: createCategory,
            createBudgetCategory: createBudgetCategory,
            saveEntity: saveEntity,
            addEntity: addEntity,
            createDetachedEntity: createDetachedEntity
          };

          model.initialize(datacontext);
          return datacontext;

          function getBudgets() {
            var query = breeze.EntityQuery
                .from("Budgets")
                .expand("Categories")
                .orderBy("id asc");

            if (initialized) {
              query = query.using(breeze.FetchStrategy.FromLocalCache);
            }
            initialized = true;

            return manager.executeQuery(query)
                .then(getSucceeded);
          }

          function getCategories() {
            var query = breeze.EntityQuery
              .from("Categories")
              .orderBy("name asc");
            //if (initialized) {
            //  query = query.using(breeze.FetchStrategy.FromLocalCache);
            //}
            return manager.executeQuery(query)
              .then(getSucceeded);
          }

          function getBudgetData(budgetId) {
            var query = breeze.EntityQuery
              .from("Budgets")
              .expand("Categories.Category, Categories.Transactions")
              .orderBy("id asc");
            query = query.where("id", "==", budgetId);
            //if (initialized) {
            //  query = query.using(breeze.FetchStrategy.FromLocalCache);
            //}
            return manager.executeQuery(query)
              .then(getSucceeded);
          }

          function getSucceeded(data) {
            var qType = data.XHR ? "remote" : "local";
            logger.log(qType + " query succeeded");
            return data.results;
          }

          function createBudget() {
            return manager.createEntity("Budget");
          }
          function createCategory() {
            return manager.createEntity("Category");
          }
          function createBudgetCategory(initialValues) {
            return manager.createEntity("BudgetCategory", initialValues);
          }

          function createDetachedEntity(entityType, initialValues) {
            return manager.createEntity(entityType, initialValues, breeze.EntityState.Detached);
          }

          function saveEntity(masterEntity) {
            if (!manager.hasChanges()) {
              return Q();
            }
            var description = describeSaveOperation(masterEntity);
            return manager.saveChanges().then(saveSucceeded).fail(saveFailed);

            function saveSucceeded() {
              logger.log("saved " + description);
            }
            function saveFailed(error) {
              var msg = "Error saving " +
                  description + ": " +
                  getErrorMessage(error);
              masterEntity.errorMessage = msg;
              logger.log(msg, 'error');
              // Let user see invalid value briefly before reverting
              $timeout(function () { manager.rejectChanges(); }, 1000);
              throw error; // so caller can see failure
            }
          }
          function addEntity(entity) {
            manager.addEntity(entity);
          }

          function describeSaveOperation(entity) {
            var statename = entity.entityAspect.entityState.name.toLowerCase();
            var typeName = entity.entityType.shortName;
            var title = entity.name;
            title = title ? (" '" + title + "'") : "";
            return statename + " " + typeName + title;
          }
          function getErrorMessage(error) {
            var reason = error.message;
            if (reason.match(/validation error/i)) {
              reason = getValidationErrorMessage(error);
            }
            return reason;
          }
          function getValidationErrorMessage(error) {
            try { // return the first error message
              var firstItem = error.entitiesWithErrors[0];
              var firstError = firstItem.entityAspect.getValidationErrors()[0];
              return firstError.errorMessage;
            } catch (e) { // ignore problem extracting error message 
              return "validation error";
            }
          }
          function configureBreeze() {
            // configure to use the model library for Angular
            breeze.config.initializeAdapterInstance("modelLibrary", "backingStore", true);

            // configure to use camelCase
            breeze.NamingConvention.camelCase.setAsDefault();

            // configure to resist CSRF attack
            var antiForgeryToken = $("#antiForgeryToken").val();
            if (antiForgeryToken) {
              // get the current default Breeze AJAX adapter & add header
              var ajaxAdapter = breeze.config.getAdapterInstance("ajax");
              ajaxAdapter.defaultSettings = {
                headers: {
                  'RequestVerificationToken': antiForgeryToken
                },
              };
            }
          }
        }]);