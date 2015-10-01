<?php

class TM_CountdownTimer_Block_Timer_Flip
    extends TM_CountdownTimer_Block_Timer_Abstract
        implements Mage_Widget_Block_Interface
{
    const TIMER_FLIP_TEMPLATE = 'tm/countdowntimer/fliptimer.phtml';
    const TIMER_BASE_CLASS_FLIP = 'tm-cdt-flip';

    protected function _construct() {
        // die('You in fliptimer... ');
        if (!$this->hasData('template')) {
            $this->setData('template', self::TIMER_FLIP_TEMPLATE);
        }
        return parent::_construct();
    }

    public function getClassname()
    {
        $result = $this->_getData('classname');
        if (!$result) {
            $size = $this->_getData('size');
            $skin = $this->_getData('skin');
            if ($this->getHideLabels()) {
                $labels = 'flip-no-labels';
            } else {
                $labels = '';
            }
            $result = implode(' ', array(self::TIMER_BASE_CLASS_FLIP, $size, $skin, $labels));
        }
        return $result;
    }

    public function getFlipface()
    {
        if ($this->getDisplayDays()) {
            $result = 'DailyCounter';
        } else {
            $result = 'HourlyCounter';
        }
        return $result;
    }

    public static function getTimerBaseClass()
    {
        return self::TIMER_BASE_CLASS_FLIP;
    }

}