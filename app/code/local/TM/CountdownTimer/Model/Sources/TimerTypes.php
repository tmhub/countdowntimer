<?php

class TM_CountdownTimer_Model_Sources_TimerTypes
{
    public function toOptionArray()
    {
        return array(
            array(
                'value' => 'tm/countdowntimer/fliptimer.phtml',
                'label' => 'Flip timer',
            ),
            array(
                'value' => 'tm/countdowntimer/simpletimer.phtml',
                'label' => 'Simple timer',
            ),
        );
    }
}