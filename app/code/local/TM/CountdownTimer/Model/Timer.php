<?php
class TM_CountdownTimer_Model_Timer extends Mage_Core_Model_Abstract
{



  public function getDefaultTimerSettings() {
    // $products = Mage::getModel("catalog/product")
    //             -­>getCollection()
    //             ­->addAttributeToSelect('*')
    //             ­->setOrder('entity_id', 'DESC')
    //             ­->setPageSize(5);
    $type = Mage::getStoreConfig('tm_countdowntimer/general/timer_type');
    return $type;
  }

  public function getDefaultTimerType() {
    return Mage::getStoreConfig('tm_countdowntimer/general/timer_type');
  }

}