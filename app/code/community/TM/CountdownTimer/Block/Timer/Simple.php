<?php

class TM_CountdownTimer_Block_Timer_Simple
    extends TM_CountdownTimer_Block_Timer_Abstract
        implements Mage_Widget_Block_Interface
{
    const TIMER_SIMPLE_TEMPLATE = 'tm/countdowntimer/simpletimer.phtml';
    const TIMER_BASE_CLASS_SIMPLE = 'tm-cdt-simple not-started';

    protected function _construct() {
        if (!$this->hasData('template')) {
            $this->setData('template', self::TIMER_SIMPLE_TEMPLATE);
        }
        return parent::_construct();
    }

    public function getClassname()
    {
        $result = $this->_getData('classname');
        if (!$result) {
            $result = implode(' ', array(self::TIMER_BASE_CLASS_SIMPLE, 'simpletimer'));
        }
        return $result;
    }

    public static function getTimerBaseClass()
    {
        return self::TIMER_BASE_CLASS_SIMPLE;
    }

}