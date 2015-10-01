<?php

    $installer = $this;

    //die($installer->getTable('tm_countdowntimer/test_table'));

    $installer->startSetup();

    $table = $installer->getConnection()
        ->newTable($installer->getTable('tm_countdowntimer/test_table'))
        ->addColumn('type', Varien_Db_Ddl_Table::TYPE_VARCHAR, 200, array(
                'nullable'  => false,
            ), 'Timer type');
    $installer->getConnection()->createTable($table);

    $installer ->endSetup();

?>